<?php
    $sentences = [
        'Take a deep breath, relax and enjoy being in the present moment. ',
        'Take a deep breath, focus on this moment. Don’t let it slip away.',
        'Take a deep breath, do not worry about the future, experience this moment.',
        'Take a deep breath, never run away from what is bothering you. You got this.',
        'Take a deep breath, visualize your goals for today. You got this.',
        'Take a deep breath, let go of the past and the future. Be here and now.',
        'Take a deep breath, surrender to the present moment...',
        'Take a deep breath, let go of what was. Have faith in what will be.',
        'Take a deep breath. the little things? The little moments? They aren’t little.',
        'Take a deep breath, pay attention to what is happening around you.',
        'Take a deep breath, befriend the fact that being alive is a miracle.',
        'Take a deep breath, live fully this actual moment of your life.',
        'Take a deep breath, relax, have a serene encounter with reality.',
        'Take a deep breath, do not get too caught up in the busyness of the world.',
        'Take a deep breath, make your peace with the reality of this moment.',
        'Take a deep breath, the things that matter are not necessarily fantastic or grand.',
        'Take a deep breath, rejoicing in ordinary things takes guts.',
        'Take a deep breath, you cannot always control the results, only your actions.',
        'Take a deep breath, accept this moment as it is.',
        'Take a deep breath, life is messy and imperfect. You got this.',
        'Take a deep breath, allow some fresh air to enter your mind.',
        'Take a deep breath, relax, maybe step outside for a while.',
        'Take a deep breath, you can only lose what you cling to.',
        'Take a deep breath, nothing is forever, except change.',
        'Take a deep breath, every experience holds a blessing of some kind.',
        'Take a deep breath, if the problem can be solved why worry?',
        'Take a deep breath, if the problem cannot be solved worrying will not help.',
        'Take a deep breath, do not dream of the future, concentrate on here and now.',
        'Take a deep breath, do not dwell in the past, concentrate on here and now.',
        'Take a deep breath, treat everyone you meet today as if they were you.'
    ];
?>
<div class="dialog-wrapper progress-dialog">
    <div class="dialog">
        <div class="dialog-header">
            <h2>Creating resource</h2>
        </div>
        <div class="dialog-content">
            <div class="form-content">
                <p><?= $sentences[array_rand($sentences, 1)]; ?></p>
                <div class="progress-bar-wrapper">
                    <span class="progress-bar big infinite" style="width: 33%;">
                        <span class="progress"></span>
                    </span>
                </div>
                <div class="progress-details">
                    <span class="progress-step-label">Encrypting secret</span>
                    <span class="progress-percent">33%</span>
                </div>
            </div>
            <div class="submit-wrapper clearfix">
                <a class="button primary processing">&nbsp;
                    <span class="visually-hidden">processing</span>
                </a>
            </div>
        </div>
    </div>
</div>
